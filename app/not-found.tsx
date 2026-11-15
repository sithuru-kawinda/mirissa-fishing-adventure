import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-navy px-6 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-turquoise">404</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">Lost at sea</h1>
      <p className="mt-4 max-w-md text-white/75">We couldn&apos;t find the page you were looking for.</p>
      <div className="mt-8 flex gap-4">
        <ButtonLink href="/">Back Home</ButtonLink>
        <ButtonLink href="/packages" variant="light">
          View Packages
        </ButtonLink>
      </div>
    </div>
  );
}
