// Desert Doo Doo — booking form (front-end only; concierge completes booking by text)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("book-form");
  const confirm = document.getElementById("book-confirm");
  const cleanerCta = document.getElementById("cleaner-cta");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    // Stash the request locally so the concierge flow can pick it up later.
    try {
      const queue = JSON.parse(localStorage.getItem("ddd_requests") || "[]");
      queue.push({ ...data, at: new Date().toISOString() });
      localStorage.setItem("ddd_requests", JSON.stringify(queue));
    } catch (_) { /* storage unavailable — still confirm */ }
    confirm.hidden = false;
    form.querySelector("button[type=submit]").disabled = true;
    confirm.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Cleaner CTA reuses the booking anchor; tag the intent.
  cleanerCta.addEventListener("click", () => {
    try { localStorage.setItem("ddd_intent", "cleaner"); } catch (_) {}
  });
});
