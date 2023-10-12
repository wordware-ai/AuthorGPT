import Image from "next/image";

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
    </footer>
  );
}
