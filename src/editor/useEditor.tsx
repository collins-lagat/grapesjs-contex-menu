import { useEffect, useState } from "react";
import grapesjs from "grapesjs";

import { config } from "./config";

export const useEditor = () => {
  const [editor, setEditor] = useState<grapesjs.Editor | null>(null);

  useEffect(() => {
    const editorInstance = grapesjs.init(config);
    setEditor(editorInstance);
  }, [config]);

  return editor;
};
