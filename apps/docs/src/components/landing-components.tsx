"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field"
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypographyMuted } from "@/components/ui/typography"
import { ToastProvider, Toaster, useToast } from "@/components/ui/toast"

type ComponentExample = { name: string; title: string; description: string; exampleCount: number }
const frameworks = [{ value: "react", label: "React" }, { value: "next", label: "Next.js" }, { value: "vite", label: "Vite" }]

export function LandingComponents({ items }: { items: ComponentExample[] }) {
  return <section className="landing-examples landing-band" aria-labelledby="landing-components">
    <div className="landing-examples-heading">
      <div><p className="landing-kicker">01 / THE BUILDING BLOCKS</p><h2 id="landing-components">Try the components.</h2></div>
      <Button variant="ghost" render={<Link href="/components" />}>View all components <span aria-hidden="true">↗</span></Button>
    </div>
    <ToastProvider><LandingExamples items={items} /><Toaster /></ToastProvider>
  </section>
}

function LandingExamples({ items }: { items: ComponentExample[] }) {
  const toast = useToast()
  const demos: Record<string, ReactNode> = {
    button: <div className="landing-example-actions"><Button onClick={() => toast.add({ title: "Changes saved", description: "Your changes were saved in this preview.", type: "success" })}>Save changes</Button><Button variant="outline" onClick={() => toast.add({ title: "Action cancelled", type: "info" })}>Cancel</Button></div>,
    field: <Field className="w-full" name="landing-email" validationMode="onBlur"><FieldLabel>Email address</FieldLabel><FieldControl type="email" placeholder="you@company.com" /><FieldDescription>Use your work email.</FieldDescription><FieldError match="typeMismatch">Enter a valid email address.</FieldError></Field>,
    tabs: <Tabs className="w-full" defaultValue="overview"><TabsList aria-label="Project example"><TabsTab value="overview">Overview</TabsTab><TabsTab value="activity">Activity</TabsTab></TabsList><TabsPanel value="overview" className="grid gap-3 pt-3"><Badge variant="secondary" className="w-fit">3 active projects</Badge><TypographyMuted>Everything you're working on, together.</TypographyMuted></TabsPanel><TabsPanel value="activity" className="grid gap-3 pt-3"><Badge variant="outline" className="w-fit">Up to date</Badge><TypographyMuted>Your latest changes have been saved.</TypographyMuted></TabsPanel></Tabs>,
    dialog: <Dialog><DialogTrigger render={<Button variant="outline">Edit profile</Button>} /><DialogContent><DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Try a Zuno dialog with the default theme.</DialogDescription></DialogHeader><div className="grid gap-2"><Label htmlFor="landing-profile-name">Name</Label><Input id="landing-profile-name" defaultValue="Alex Morgan" /></div><DialogFooter><DialogClose render={<Button variant="outline">Cancel</Button>} /><DialogClose render={<Button onClick={() => toast.add({ title: "Profile updated", description: "Your changes were saved in this preview.", type: "success" })}>Save changes</Button>} /></DialogFooter></DialogContent></Dialog>,
    select: <div className="grid w-full gap-2"><Label htmlFor="landing-framework">Framework</Label><Select items={frameworks} defaultValue="react"><SelectTrigger id="landing-framework" aria-label="Framework"><SelectValue /></SelectTrigger><SelectContent>{frameworks.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>,
    toast: <Button variant="outline" onClick={() => toast.add({ title: "Changes saved", description: "Everything is right where you left it.", type: "success" })}>Show notification</Button>,
  }

  return <div className="landing-examples-grid">{items.map(item => <Card key={item.name} className="landing-example-card" data-component={item.name}>
    <CardHeader><CardTitle>{item.title}</CardTitle><CardDescription>{item.description}</CardDescription></CardHeader>
    <CardContent className="landing-example-demo">{demos[item.name]}</CardContent>
    <CardFooter className="mt-auto justify-between gap-2"><Badge variant="secondary">{item.exampleCount} {item.exampleCount === 1 ? "example" : "examples"}</Badge><Button variant="ghost" size="sm" render={<Link href={`/components/${item.name}`} />} aria-label={`View ${item.title} documentation`}>Docs <span aria-hidden="true">↗</span></Button></CardFooter>
  </Card>)}</div>
}
