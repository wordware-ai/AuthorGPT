import Image from "next/image";
import Discord from "@/components/icons/Discord";

export function WordwareFooter() {
  return (
    <footer className="p-4 bg-white w-full">
      <div className="mx-auto w-fit">
        <p className="font-semibold uppercase text-center">Powered by</p>
        <div className="max-w-xs">
          <a href="https://wordware.ai" target="_blank">
            <Image src="/logo_black.svg" alt="Wordware logo" width="1000" height="400" />
          </a>
        </div>
      </div>
      <div className="mx-auto w-fit mt-4">
        <a href="https://discord.gg/6Zm5FGC2kR">
          <Discord width="100" height="80" className="w-8 hover:fill-[#5865F2] fill-black" />
        </a>
      </div>
    </footer>
  );
}
