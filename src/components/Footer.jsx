function Footer() {
  return (
    <div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4 fixed bottom-0 left-0 w-full">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by devTinder
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
