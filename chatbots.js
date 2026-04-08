const messages = [];

async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const input = inputField.value.trim();
    if (!input) return;

    const chat = document.getElementById("chat");

    // نمایش پیام کاربر
    const userBubble = document.createElement("div");
    userBubble.className = "user-bubble";
    userBubble.textContent = input;
    chat.appendChild(userBubble);

    inputField.value = "";
    chat.scrollTop = chat.scrollHeight;

    // اضافه کردن پیام کاربر به حالت گفتگو
    messages.push({ role: "user", content: input });

    // نمایش پیام تایپینگ بات
    const typingBubble = document.createElement("div");
    typingBubble.className = "bot-bubble typing";
    typingBubble.textContent = "در حال تایپ...";
    chat.appendChild(typingBubble);
    chat.scrollTop = chat.scrollHeight;

    // ارسال به OpenAI API
    try {
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

        // جایگزینی تایپینگ با پاسخ واقعی
        typingBubble.textContent = reply;
        messages.push({ role: "assistant", content: reply });
        chat.scrollTop = chat.scrollHeight;

    } catch (error) {
        typingBubble.textContent = "خطا در اتصال به سرور.";
        console.error(error);
    }
}
