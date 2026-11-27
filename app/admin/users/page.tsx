import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import type { Prisma } from "@/app/generated/prisma/client";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { Badge } from "@/components/dashboard/Badge";
import {
  Pagination,
  pageNumber,
  pageSize,
} from "@/components/dashboard/Pagination";
import { adminLinks } from "../links";
import { UserActions } from "./_components/UserActions";
import { isUserKind, kindsOf, userKinds } from "./kinds";
import {
  inputClass,
  smallButtonClass,
  smallOutlineButtonClass,
} from "@/components/styles";
import { cn } from "cn";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; page?: string }>;
}) {
  const session = await requireAdmin();
  const { q = "", type, page: pageParam } = await searchParams;
  const query = q.trim();
  const page = pageNumber(pageParam);

  const where: Prisma.UserWhereInput = {
    ...(isUserKind(type) && userKinds[type].where),
    ...(query && {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        banned: true,
        createdAt: true,
        missionaryApplications: { select: { status: true } },
        partnerProfile: { select: { status: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <DashboardShell
      label="Admin"
      user={session.user}
      title="Users"
      subtitle="Everyone with an account: admins, missionaries, and partners."
      links={adminLinks}
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form className="flex flex-1 flex-col gap-2 sm:flex-row" role="search">
          <label className="relative flex-1 sm:max-w-sm">
            <span className="sr-only">Search by name or email</span>
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground"
            />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search by name or email"
              className={cn(inputClass, "h-10 w-full pl-9 pr-3")}
            />
          </label>
          <select
            name="type"
            defaultValue={isUserKind(type) ? type : ""}
            aria-label="Filter by type"
            className={cn(inputClass, "h-10 px-3")}
          >
            <option value="">Everyone</option>
            {Object.entries(userKinds).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button type="submit" className={smallOutlineButtonClass}>
            Filter
          </button>
        </form>
        <Link href="/admin/users/new" className={smallButtonClass}>
          <Plus aria-hidden="true" className="size-4" />
          Add admin account
        </Link>
      </div>

      <section className="border border-border bg-card">
        {users.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No users match.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">
                  User
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-3 font-semibold md:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-3 font-semibold lg:table-cell"
                >
                  Joined
                </th>
                <th scope="col" className="px-5 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="font-semibold hover:text-brand"
                      >
                        {user.name}
                      </Link>
                      {user.banned && <Badge tone="danger">Banned</Badge>}
                    </div>
                    <span className="block text-muted-foreground">
                      {user.email}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3 md:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {kindsOf(user).map((kind) => (
                        <Badge key={kind} tone="neutral">
                          {userKinds[kind].label}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-muted-foreground lg:table-cell">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {user.id === session.user.id ? (
                      <span className="text-xs text-subtle-foreground">
                        You
                      </span>
                    ) : (
                      <UserActions user={user} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <Pagination
        page={page}
        pages={pages}
        total={total}
        noun="users"
        params={{
          ...(query && { q: query }),
          ...(isUserKind(type) && { type }),
        }}
      />
    </DashboardShell>
  );
}
