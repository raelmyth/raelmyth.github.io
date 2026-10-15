/* Gal page guard: sends visitors back to the login screen unless they logged in first.
   Used by pages like galactic.html. Needs vault.js loaded before it. */
(async () => {
  try {
    const raw = sessionStorage.getItem("gal-s");
    const V = window.VAULT;
    if (!raw || !V) throw new Error("not logged in");
    const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("raw", b64(raw), "AES-GCM", false, ["decrypt"]);
    await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(V.iv) }, key, b64(V.data));
    const hide = document.getElementById("gal-hide");
    if (hide) hide.remove();
  } catch (e) {
    location.replace("index.html");
  }
})();
