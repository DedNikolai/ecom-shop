import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/category";

type Props = {
  value: string[];                 
  onChange: (next: string[]) => void;
  options: Category[];              
  placeholder?: string;
  disabled?: boolean;
};

export function MultiSelectCategories({
  value, onChange, options, placeholder, disabled,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const toggle = (id: string) => {
    const exists = value.includes(id);
    onChange(exists ? value.filter(v => v !== id) : [...value, id]);
  };

  const selected = options.filter(o => value.includes(o.id));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selected.length > 0
            ? selected.map(s => s.title).join(", ")
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No categories found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map(opt => {
                const checked = value.includes(opt.id);
                return (
                  <CommandItem
                    key={opt.id}
                    value={opt.id}
                    onSelect={() => toggle(opt.id)}
                    className="flex items-center gap-2"
                  >
                    <Checkbox checked={checked} onCheckedChange={() => toggle(opt.id)} />
                    <span className={cn("truncate", checked && "font-medium")}>{opt.title}</span>
                    {checked && <Check className="ml-auto h-4 w-4" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
