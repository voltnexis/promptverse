
window.prompts = [];

// supabase.js
// PromptVerse Supabase Loader (Replaces prompts.js)

// ✅ Supabase Project Config
const SUPABASE_URL = "https://yspnibvfsbawwesveoji.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcG5pYnZmc2Jhd3dlc3Zlb2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MjE3NTksImV4cCI6MjA4NTk5Nzc1OX0.UldM-ltUAIo1cf8ppA0FYQp2DICutCVshB1r3Ek4M1o";

// ✅ Load Supabase Client from CDN
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

script.onload = async () => {
  const { createClient } = supabase;

  // ✅ Create Supabase Client
  const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  console.log("✅ Supabase Connected... Fetching Prompts");

  // ✅ Fetch PromptVerse Table Data
  let { data, error } = await db
    .from("promptverse") // ✅ Correct Table Name Here
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("❌ Supabase Fetch Error:", error);
    alert("Failed to load prompts from Supabase!");
    return;
  }

  // ✅ Convert Supabase columns → Website format
  window.prompts = data.map((p) => ({
    id: p.id,
    name: p.name,
    short: p.short,
    description: p.description,

    // ✅ Map new column names back to old ones
    org_img_url: p.org_img_url,
    ai_img_url: p.ai_img_url,

    prompt: p.prompt,
    tags: p.tags,
    model: p.model,
    resolution: p.resolution,

    likes: p.likes || 0,
    dislikes: p.dislikes || 0,

    author: p.author || "PromptVerse Admin",
  }));

  console.log("✅ Prompts Loaded:", window.prompts.length);

  // ✅ Start page rendering after prompts load
  loadReactions();
  renderGrid();
};

document.head.appendChild(script);
