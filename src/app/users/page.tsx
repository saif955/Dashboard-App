"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchUsers, type User } from "@/lib/users";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 6, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.25 },
  },
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchUsers();
        if (!cancelled) setUsers(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Failed to load users");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
    );
  }, [users, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pagedUsers = filteredUsers.slice(start, end);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-600">Data from JSONPlaceholder API</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-4"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-600">
            Per page
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded-md px-2 py-2 text-sm"
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </motion.div>

      {/* Headers */}
      {!loading && !error && (
        <div className="hidden md:flex items-center px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 border bg-gray-50 rounded-t-lg">
          <div className="flex-1 min-w-0">Name</div>
          <div className="w-64">Email</div>
          <div className="w-56">Phone</div>
          <div className="w-56">Company</div>
        </div>
      )}

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y border border-t-0 rounded-b-lg bg-white"
          >
            {pagedUsers.map((user) => (
              <motion.li key={user.id} variants={itemVariants}>
                <Link
                  href={`/users/${user.id}`}
                  className="group flex items-center gap-6 px-5 py-5 transition-colors hover:bg-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-700 hover:underline truncate">
                      {user.name}
                    </p>
                    {/* On small screens show email under name */}
                    <p className="md:hidden text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>
                  {/* Columns visible on md+ */}
                  <div className="hidden md:block w-64 truncate text-gray-700">
                    {user.email}
                  </div>
                  <div className="hidden md:block w-56 truncate text-gray-700">
                    {user.phone}
                  </div>
                  <div className="hidden md:block w-56 truncate text-gray-700">
                    {user.company.name}
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length === 0 ? 0 : start + 1}–
              {Math.min(end, filteredUsers.length)} of {filteredUsers.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!canPrev}
                onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={!canNext}
                onClick={() =>
                  canNext && setPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">
            No users found matching your search.
          </p>
        </motion.div>
      )}
    </div>
  );
}
