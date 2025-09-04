import { fetchUser } from "@/lib/users";
import Link from "next/link";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({ params }: Params) {
  const { id } = await params;
  const user = await fetchUser(Number(id));

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        <Link href="/users" className="text-blue-600 hover:underline">
          ← Back to Users
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Name</dt>
              <dd className="font-medium">{user.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Username</dt>
              <dd className="font-medium">@{user.username}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="font-medium">{user.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Phone</dt>
              <dd className="font-medium">{user.phone}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Website</dt>
              <dd className="font-medium text-blue-700">{user.website}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Street</dt>
              <dd className="font-medium">{user.address.street}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Suite</dt>
              <dd className="font-medium">{user.address.suite}</dd>
            </div>
            <div>
              <dt className="text-gray-500">City</dt>
              <dd className="font-medium">{user.address.city}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Zipcode</dt>
              <dd className="font-medium">{user.address.zipcode}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Geo Location</dt>
              <dd className="font-medium">
                {user.address.geo.lat}, {user.address.geo.lng}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-xl border p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Company</h2>
        <dl className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <dt className="text-gray-500">Company Name</dt>
            <dd className="font-medium">{user.company.name}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Catch Phrase</dt>
            <dd className="font-medium">{user.company.catchPhrase}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Business</dt>
            <dd className="font-medium">{user.company.bs}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
