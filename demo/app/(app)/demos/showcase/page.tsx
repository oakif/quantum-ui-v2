"use client"

import { useState } from "react"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/registry/new-york-v4/ui/card"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"
import { Switch } from "@/registry/new-york-v4/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/new-york-v4/ui/table"
import { Heart, Star, Check, X, Upload, Pencil, Trash2 } from "lucide-react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">{title}</h2>
      {children}
    </div>
  )
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  )
}

export default function ShowcasePage() {
  const [switchChecked, setSwitchChecked] = useState(false)
  const [cardSwitchChecked, setCardSwitchChecked] = useState(true)
  const [selectValue, setSelectValue] = useState("option-1")

  return (
    <div className="flex flex-1 flex-col">
      <div className="container-wrapper">
        <div className="container max-w-4xl py-12 space-y-16">
          <div>
            <h1 className="text-2xl font-bold">Component Showcase</h1>
            <p className="text-muted-foreground mt-1">
              All migrated components from the quantum-ui registry.
            </p>
          </div>

          {/* Button */}
          <Section title="Button">
            <SubSection label="Variants">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </SubSection>
            <SubSection label="Sizes">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </SubSection>
            <SubSection label="With icons">
              <Button><Heart className="size-4" /> Like</Button>
              <Button variant="outline"><Star className="size-4" /> Star</Button>
              <Button variant="destructive"><Trash2 className="size-4" /> Delete</Button>
            </SubSection>
            <SubSection label="Disabled">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled</Button>
            </SubSection>
          </Section>

          {/* Badge */}
          <Section title="Badge">
            <SubSection label="Standard variants">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </SubSection>
            <SubSection label="With icons (SummaryStrip replacement pattern)">
              <div className="flex gap-2 flex-wrap py-2">
                <Badge><Upload className="size-3" /> 42 uploads</Badge>
                <Badge variant="secondary"><Pencil className="size-3" /> 8 renamed</Badge>
                <Badge variant="destructive"><X className="size-3" /> 14 skipped</Badge>
              </div>
            </SubSection>
          </Section>

          {/* Switch */}
          <Section title="Switch">
            <SubSection label="Basic toggle">
              <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
              <span className="text-sm">{switchChecked ? "On" : "Off"}</span>
            </SubSection>
            <SubSection label="With label">
              <Switch label="Enable notifications" checked={switchChecked} onCheckedChange={setSwitchChecked} />
            </SubSection>
            <SubSection label="With label + description">
              <Switch
                label="Auto-sync photos"
                description="Automatically sync new photos from connected drives"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
            </SubSection>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Card variant (replaces ToggleSwitch)</p>
              <div className="max-w-md space-y-3">
                <Switch
                  label="Delete originals after copy"
                  card
                  checked={cardSwitchChecked}
                  onCheckedChange={setCardSwitchChecked}
                />
                <Switch
                  label="Split into events by time gap"
                  description="Group photos into separate event folders when there's a gap between shots"
                  card
                  checked={true}
                  onCheckedChange={() => {}}
                />
                <Switch
                  label="Disabled option"
                  description="This option is not available"
                  card
                  disabled
                />
              </div>
            </div>
          </Section>

          {/* Input */}
          <Section title="Input">
            <SubSection label="Default">
              <Input placeholder="Type something..." className="max-w-xs" />
            </SubSection>
            <SubSection label="Disabled">
              <Input placeholder="Disabled" disabled className="max-w-xs" />
            </SubSection>
          </Section>

          {/* Card */}
          <Section title="Card">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Photo Import</CardTitle>
                  <CardDescription>Import photos from SD card</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">42 photos ready to import</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Gallery</CardTitle>
                  <CardDescription>Published galleries</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">3 galleries, 847 photos</p>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Select */}
          <Section title="Select">
            <SubSection label="Standard select">
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pick an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option-1">Option 1</SelectItem>
                  <SelectItem value="option-2">Option 2</SelectItem>
                  <SelectItem value="option-3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </SubSection>
          </Section>

          {/* Table */}
          <Section title="Table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Filename</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>IMG_0001.CR3</TableCell>
                  <TableCell>RAW</TableCell>
                  <TableCell>24.5 MB</TableCell>
                  <TableCell><Badge variant="secondary">Imported</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IMG_0002.CR3</TableCell>
                  <TableCell>RAW</TableCell>
                  <TableCell>26.1 MB</TableCell>
                  <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CORRUPT.CR3</TableCell>
                  <TableCell>RAW</TableCell>
                  <TableCell>0 B</TableCell>
                  <TableCell><Badge variant="destructive">Error</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

        </div>
      </div>
    </div>
  )
}
