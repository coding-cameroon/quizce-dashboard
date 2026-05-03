"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const QuestionEditorCard = ({ data }: { data: any }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Question Area */}
        <div className="flex gap-4">
          <span className="font-bold shrink-0">Q{data.number}</span>
          <Textarea defaultValue={data.question} className="flex-1" />
        </div>

        {/* Options Grid with A-D Labels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.options.map((opt: string, i: number) => {
            const label = String.fromCharCode(65 + i);
            return (
              <div key={i} className="flex gap-2 items-center">
                <Label className="font-bold w-6 text-center">{label}</Label>
                <Input defaultValue={opt} />
              </div>
            );
          })}
        </div>

        {/* Correct Option and Full-Width Explanation */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Correct Option</Label>
            <Input
              placeholder="Correct Option"
              defaultValue={data.correctOption}
            />
          </div>

          <div className="w-full space-y-2">
            <Label>Explanation</Label>
            <Textarea
              placeholder="Explanation"
              defaultValue={data.explanation}
              className="w-full"
              spellCheck={false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
