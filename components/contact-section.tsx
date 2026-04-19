import { SectionLabel } from "./section-label";

export function ContactSection() {
  return (
    <section id="contact">
      <SectionLabel label="Contact" />
      <div className="space-y-2 text-[15px] text-[#3a3a3a]">
        <p>
          <a
            href="mailto:vinodjb07@gmail.com"
            className="text-[#1a1a1a] underline underline-offset-[3px] hover:opacity-60 transition-opacity"
          >
            vinodjb07@gmail.com
          </a>
        </p>
        <p>
          <a
            href="https://github.com/Vinodbiradar09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a1a1a] underline underline-offset-[3px] hover:opacity-60 transition-opacity"
          >
            github.com/Vinodbiradar09
          </a>
        </p>
        <p>
          <a
            href="https://x.com/toovinod09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a1a1a] underline underline-offset-[3px] hover:opacity-60 transition-opacity"
          >
            x.com/toovinod09
          </a>
        </p>
        <p className="text-[#666]">Bengaluru, India</p>
      </div>
    </section>
  );
}
