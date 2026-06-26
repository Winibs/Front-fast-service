import {
  Sparkles, Hammer, Wrench, PaintRoller, Trees, Zap, Droplet,
  CreditCard, QrCode, Truck, CheckCircle2, Star, Tag, Clock,
  Bell, ShieldCheck, Package, HelpCircle, Info, MessageSquare,
} from "lucide-react";

const MAP = {
  Sparkles, Hammer, Wrench, PaintRoller, Trees, Zap, Droplet,
  CreditCard, QrCode, Truck, CheckCircle2, Star, Tag, Clock,
  Bell, ShieldCheck, Package, HelpCircle, Info, MessageSquare,
};

export default function Icon({ name, ...props }) {
  const Cmp = MAP[name] || Sparkles;
  return <Cmp {...props} />;
}
