import type { LucideIcon } from "lucide-react";

interface SectionTitleProps {
    icon: LucideIcon;
    children: React.ReactNode;
}

export function SectionTitle({ icon: Icon, children }: SectionTitleProps) {
    return (
        <h2 className="text-2xl font-bold flex items-center gap-2">
            <Icon className="w-6 h-6 text-primary" />
            {children}
        </h2>
    );
}
