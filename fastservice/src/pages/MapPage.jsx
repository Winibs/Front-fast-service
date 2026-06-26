import { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, CircleF } from "@react-google-maps/api";
import { MapPin, Plus, X, Home as HomeIcon, Briefcase, Trash2, Truck, ChevronRight, Crosshair } from "lucide-react";
import { useMapStore } from "../store/mapStore.js";
import { ATITUS } from "../data/mock.js";
import { useToast } from "../context/ToastContext.jsx";

const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f4f3fb" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b6b80" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c7d6f5" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#e4f0e2" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dcd7fb" }] },
];

export default function MapPage() {
  const { points, load, addPoint, removePoint, selectedId, select } = useMapStore();
  const toast = useToast();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(null); // {lat,lng}
  const [name, setName] = useState("");
  const [type, setType] = useState("home");
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: KEY || "",
  });

  useEffect(() => { load(); }, [load]);

  const onMapClick = useCallback((e) => {
    if (!adding) return;
    setDraft({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, [adding]);

  const confirmAdd = async () => {
    if (!draft || !name.trim()) { toast.error("Toque no mapa e dê um nome ao local."); return; }
    try {
      await addPoint({ name: name.trim(), lat: draft.lat, lng: draft.lng, type });
      toast.success("Ponto adicionado!");
      setAdding(false); setDraft(null); setName(""); setType("home");
    } catch { toast.error("Não foi possível salvar o ponto."); }
  };

  const recenter = () => {
    if (mapRef.current) { mapRef.current.panTo(ATITUS); mapRef.current.setZoom(14); }
  };

  const selected = points.find((p) => p.id === selectedId);

  if (!KEY) {
    return (
      <div className="scroll-area page center" style={{ flexDirection: "column", gap: 12, padding: 30 }}>
        <span className="ic-box" style={{ width: 56, height: 56 }}><MapPin size={26} /></span>
        <p className="muted" style={{ textAlign: "center" }}>
          Defina <b>VITE_GOOGLE_MAPS_API_KEY</b> no arquivo <code>.env</code> para carregar o mapa.
        </p>
      </div>
    );
  }

  return (
    <div className="page" style={{ position: "relative", overflow: "hidden" }}>
      {/* topo flutuante */}
      <div className="map-top">
        <MapPin size={18} color="var(--primary)" />
        <div className="grow">
          <div style={{ font: "700 14px var(--font-display)" }}>Atitus — Passo Fundo, RS</div>
          <div className="t-xs muted">{points.length} {points.length === 1 ? "local salvo" : "locais salvos"}</div>
        </div>
        <button className="iconbtn ghost" onClick={recenter} aria-label="Recentralizar">
          <Crosshair size={18} />
        </button>
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100vh" }}
          center={ATITUS}
          zoom={14}
          onClick={onMapClick}
          onLoad={(m) => { mapRef.current = m; }}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: false,
            clickableIcons: false,
          }}
        >
          <CircleF
            center={ATITUS}
            radius={500}
            options={{ strokeColor: "#5b4fe9", strokeOpacity: 0.4, strokeWeight: 1.5, fillColor: "#5b4fe9", fillOpacity: 0.08 }}
          />
          {points.map((p) => (
            <MarkerF
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              onClick={() => select(p.id)}
              icon={pinIcon(p.type === "work" ? "#ff7a59" : "#5b4fe9")}
            />
          ))}
          {draft && (
            <MarkerF position={draft} icon={pinIcon("#15a85a")} animation={window.google?.maps?.Animation?.BOUNCE} />
          )}
        </GoogleMap>
      ) : (
        <div className="map-wrap center"><div className="spinner" /></div>
      )}

      {/* botão adicionar */}
      {!adding && (
        <button className="fab" onClick={() => { setAdding(true); select(null); }} aria-label="Adicionar ponto">
          <Plus size={26} />
        </button>
      )}

      {/* modo adicionar */}
      {adding && (
        <div className="map-card">
          <div className="between" style={{ marginBottom: 10 }}>
            <span style={{ font: "700 15px var(--font-display)" }}>Novo ponto</span>
            <button className="iconbtn ghost" onClick={() => { setAdding(false); setDraft(null); }}><X size={18} /></button>
          </div>
          <p className="t-xs muted" style={{ marginBottom: 10 }}>
            {draft ? "Local marcado! Dê um nome abaixo." : "Toque no mapa para escolher o local."}
          </p>
          <div className="input-wrap" style={{ marginBottom: 10 }}>
            <MapPin size={17} />
            <input placeholder="Ex: Minha casa" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="seg" style={{ marginBottom: 12 }}>
            <button className={type === "home" ? "on" : ""} onClick={() => setType("home")}><HomeIcon size={15} style={{ marginRight: 6 }} />Casa</button>
            <button className={type === "work" ? "on" : ""} onClick={() => setType("work")}><Briefcase size={15} style={{ marginRight: 6 }} />Trabalho</button>
          </div>
          <button className="btn btn-primary" onClick={confirmAdd}>Salvar ponto</button>
        </div>
      )}

      {/* card de ponto selecionado */}
      {!adding && selected && (
        <div className="map-card">
          <div className="row gap-12">
            <span className="ic-box" style={{ background: selected.type === "work" ? "var(--spark-tint)" : "var(--primary-tint)", color: selected.type === "work" ? "var(--spark)" : "var(--primary)" }}>
              {selected.type === "work" ? <Briefcase size={20} /> : <HomeIcon size={20} />}
            </span>
            <div className="grow">
              <div className="ttl">{selected.name}</div>
              <div className="sub">{selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}</div>
            </div>
            <button className="iconbtn ghost" onClick={() => { removePoint(selected.id); toast.info("Ponto removido."); }} aria-label="Remover">
              <Trash2 size={18} color="var(--danger)" />
            </button>
          </div>
        </div>
      )}

      {/* card profissional a caminho (personalização do mockup) */}
      {!adding && !selected && (
        <div className="map-card">
          <div className="row gap-12">
            <span className="ic-box" style={{ background: "var(--success-tint)", color: "var(--success)" }}><Truck size={20} /></span>
            <div className="grow">
              <div className="ttl">Profissional a caminho</div>
              <div className="sub">Carlos chega em ~8 min · 1,2 km</div>
            </div>
            <ChevronRight size={20} className="muted" />
          </div>
        </div>
      )}
    </div>
  );
}

function pinIcon(color) {
  if (typeof window === "undefined" || !window.google) return undefined;
  return {
    path: "M12 0C7 0 3 4 3 9c0 6.5 9 15 9 15s9-8.5 9-15c0-5-4-9-9-9z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#fff",
    strokeWeight: 2,
    scale: 1.6,
    anchor: new window.google.maps.Point(12, 24),
  };
}
