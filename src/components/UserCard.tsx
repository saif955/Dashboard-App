"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@/lib/users";
import Link from "next/link";

interface UserCardProps {
  user: User;
  variants?: Variants;
}

export default function UserCard({ user, variants }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div variants={variants}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700">{user.company.name}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Phone:</span>
              <span>{user.phone}</span>
            </div>
            <div className="flex space-x-2">
              <Link href={`/users/${user.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  View
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
