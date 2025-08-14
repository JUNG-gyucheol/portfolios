export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-black border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <p className="text-white/40 text-sm mt-2 md:mt-0">
            Designed & Built with ❤️ using Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
