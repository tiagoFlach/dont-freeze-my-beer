import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <header className="mb-6">
      <div className="bg-background border-b border-neutral-800 text-neutral-100 h-16 items-center">
        <div className="h-16 px-6 flex mx-auto max-w-5xl justify-between items-center">
          <div className="text-xl font-bold">Don't Freeze My Beer</div>
          <nav className="">
            <ul>
              <li>
                <a
                  href="https://github.com/tiagoFlach/dont-freeze-my-beer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon" aria-label="GitHub">
                    <Github />
                  </Button>
                </a>
              </li>
              <li>{/* <LanguageMenu /> */}</li>
              <li>{/* <ToggleTheme /> */}</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
