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
      <h2 className="text-center text-lg font-semibold text-blue-400">
        AI-Powered Presentations
      </h2>
      <h1 className="mt-2 text-center text-3xl font-bold">
        Generate Custom PowerPoint Slides
      </h1>
      <p className="mt-2 text-center text-gray-700 dark:text-slate-300">
        Enter a topic, specify the number of slides, and choose your preferences.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Presentation Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numSlides"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Number of Slides</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex-1 mt-4">
                  <FormLabel>Presentation Language</FormLabel>
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
                <FormItem className="flex-1 mt-4">
                  <FormLabel>Presentation Theme</FormLabel>
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

          <div className="text-center mt-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto cursor-pointer"
            >
              {isSubmitting ? <Spinner /> : "Generate Presentation"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
