import { Link } from "react-router-dom";

const Sidebar = ({ items }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full pt-6 px-4 fixed top-16 left-0">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.label}>
            <Link to={item.path} className="block hover:bg-gray-700 p-2 rounded">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
