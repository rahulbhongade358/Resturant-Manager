import React, { memo } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  ClipboardList,
  Users,
} from "lucide-react";
const QuickLinks = () => {
  return (
    <div>
      <h1 className="text-lg font-bold mb-4">⚡ Quick Links</h1>

      <div className="hidden md:flex flex-col gap-3">
        <Link className="link-item" to="/dashboard">
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link className="link-item" to="/addmenu">
          <PlusCircle size={18} /> Add Menu
        </Link>
        <Link className="link-item" to="/menu">
          <List size={18} /> View Menu
        </Link>
        <Link className="link-item" to="/allorder">
          <ClipboardList size={18} /> Orders
        </Link>
        <Link className="link-item" to="/signup">
          <Users size={18} /> Add Team
        </Link>
      </div>

      <div className="md:hidden grid grid-cols-2 gap-3">
        <Link className="mobile-btn" to="/dashboard">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link className="mobile-btn" to="/addmenu">
          <PlusCircle size={20} />
          Add Menu
        </Link>
        <Link className="mobile-btn" to="/menu">
          <List size={20} />
          View Menu
        </Link>
        <Link className="mobile-btn" to="/allorder">
          <ClipboardList size={20} />
          Orders
        </Link>
        <Link className="mobile-btn col-span-2" to="/signup">
          <Users size={20} />
          Add Team
        </Link>
      </div>
    </div>
  );
};

export default React.memo(QuickLinks);
