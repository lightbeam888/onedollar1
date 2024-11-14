interface NavLinkProps {
  href: string;
  label: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <li>
    <a
      className="text-black dark:text-gray-300 underline underline-offset-1 hover:text-gray-400 transition-colors"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  </li>
);
