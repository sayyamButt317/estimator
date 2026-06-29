"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/data/users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account and workspace preferences"
      />

      <Tabs defaultValue="profile" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{currentUser.avatar}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={currentUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={currentUser.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={currentUser.role} />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workspace</CardTitle>
              <CardDescription>Configure your workspace settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace">Workspace Name</Label>
                <Input id="workspace" defaultValue="Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Input id="currency" defaultValue="USD" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Default Hourly Rate</Label>
                <Input id="rate" type="number" defaultValue="150" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">AI Features</p>
                  <p className="text-xs text-muted-foreground">Enable AI-powered estimation</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>Choose what you want to be notified about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Estimate updates", desc: "When an estimate is modified" },
                { label: "Comments & mentions", desc: "When someone comments or mentions you" },
                { label: "AI suggestions", desc: "New AI-powered recommendations" },
                { label: "Weekly digest", desc: "Summary of activity every Monday" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing</CardTitle>
              <CardDescription>Manage your subscription and payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Enterprise Plan</p>
                    <p className="text-sm text-muted-foreground">$199/month · Unlimited estimates</p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Next billing date: July 1, 2024
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
