"use client"

import { Form } from "@base-ui/react/form"
import { FixturePage } from "@zuno/showcase"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldControl, FieldDescription, FieldError } from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Container } from "@/components/container"
import { Stack } from "@/components/stack"
import { Cluster } from "@/components/cluster"
import { ResponsiveGrid } from "@/components/responsive-grid"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Icon } from "@/components/ui/icon"
import { Label } from "@/components/ui/label"
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions } from "@/components/ui/empty"
import { Alert, AlertContent, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions } from "@/components/page-header"
import { FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent } from "@/components/form-section"
import { StatusBadge } from "@/components/status-badge"
import { PasswordInput } from "@/components/password-input"
import { SearchInput } from "@/components/search-input"
import { CopyButton } from "@/components/copy-button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogClose, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Select, SelectValue, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectGroupLabel, SelectSeparator } from "@/components/ui/select"
import { ToastProvider, Toaster, useToast } from "@/components/ui/toast"

const ui = { Input, Textarea, Button, Form, Field, FieldLabel, FieldControl, FieldDescription, FieldError, Container, Stack, Cluster, ResponsiveGrid, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Separator, Skeleton, Spinner, Icon, Label, Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions, Alert, AlertContent, AlertTitle, AlertDescription, PageHeader, PageHeaderContent, PageHeaderHeading, PageHeaderDescription, PageHeaderActions, FormSection, FormSectionHeader, FormSectionTitle, FormSectionDescription, FormSectionContent, StatusBadge, PasswordInput, SearchInput, CopyButton, Checkbox, Switch, Tabs, TabsList, TabsTab, TabsPanel, Avatar, AvatarImage, AvatarFallback, TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, AlertDialog, AlertDialogTrigger, AlertDialogClose, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, DropdownMenu, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Select, SelectValue, SelectGroup, SelectTrigger, SelectContent, SelectItem, SelectGroupLabel, SelectSeparator, ToastProvider, Toaster, useToast }

export function Demo() {
  return <FixturePage ui={ui} framework="React + Vite" />
}
