 const messages = [];

async function sendMessage() {
    const input = document.getElementById("userInput").value;
    if (!input) return;

    // نمایش پیام کاربر
    const chat = document.getElementById("chat");
    chat.innerHTML += `<div class="user"><b>شما:</b> ${input}</div>`;
    document.getElementById("userInput").value = "";

    // اضافه کردن پیام به حالت گفتگو
    messages.push({ role: "user", content: input });

    // نمایش پیام در حال تایپ
    chat.innerHTML += `<div class="bot"><b>چت‌بات:</b> ...در حال پاسخ</div>`;
    chat.scrollTop = chat.scrollHeight;

    // ارسال به API OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: messages
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // حذف پیام "در حال پاسخ" و اضافه کردن پاسخ واقعی
    chat.innerHTML = chat.innerHTML.replace("...در حال پاسخ", reply);
    messages.push({ role: "assistant", content: reply });
    chat.scrollTop = chat.scrollHeight;
}
