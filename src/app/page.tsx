"use client";
import SvgMatcher from "@svgcomp/components/SvgMatcher";
import { Button, Input } from "antd";
import { Suspense, useRef, useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  return (
    <main>
      <div
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{ __html: code }}
        ref={ref}
      ></div>
      <Input.TextArea
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          if (ref.current) {
            const children = ref.current.children;
            if (children.length === 1) {
              children[0].setAttribute("height", "1em");
              children[0].setAttribute("width", "1em");
              setSearch(children[0].parentElement?.innerHTML || "");
            }
          }
        }}
      >
        Find Match
      </Button>
      <Suspense fallback={"loading..."}>
        <SvgMatcher code={search} />
      </Suspense>
    </main>
  );
}
