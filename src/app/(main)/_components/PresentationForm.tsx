"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  presentationFormSchema,
  type PresentationFormSchema,
} from "@/lib/validations";
import type { PresentationFormProps } from "@/types/types";
import Spinner from "@/components/Spinner";
import supportedLanguages from "@/config/languages";

export default function PresentationForm({ onSubmit, isSubmitting }: PresentationFormProps) {
  const form = useForm<PresentationFormSchema>({
    resolver: zodResolver(presentationFormSchema),
    defaultValues: {
      topic: "",
      numSlides: 5,
      language: "English",
      theme: "professional",
      layoutPreference: "Varied",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Generate Custom PowerPoint Slides
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter a topic, set your preferences, and download a polished presentation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">

          {/* Row 1: Topic + Slides */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Presentation Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Climate Change & Renewable Energy"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    {field.value?.length ?? 0} / 200 characters (min 3)
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numSlides"
              render={({ field }) => (
                <FormItem className="sm:w-36">
                  <FormLabel>Slides</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      placeholder="5"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">1 – 20</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Language + Theme */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {supportedLanguages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.name}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Theme</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 3: Layout Preference */}
          <FormField
            control={form.control}
            name="layoutPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Layout Preference</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a layout" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Varied">Varied — mix of layouts</SelectItem>
                    <SelectItem value="Text-Heavy">Text-Heavy — more content, less visuals</SelectItem>
                    <SelectItem value="Image-Focused">Image-Focused — visuals-first</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 h-11 text-sm font-semibold transition-all duration-150"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Generating your slides…
                </span>
              ) : (
                "Generate Presentation"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
