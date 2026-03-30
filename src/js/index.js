document.addEventListener('DOMContentLoaded', function()
{
    console.log('DOM Carregado - Iniciando script');

    function setLoading(isLoading){
        const buttonSpan = document.querySelector('.btn-magic span');
        console.log('🔄 setLoading chamado:', isLoading);

        if(isLoading){
            buttonSpan.innerHTML = 'Gerando Background...';}
        else{
            buttonSpan.innerHTML = 'Gerar Background Mágico';
        }
}


     function applyGeneratedPreview(html, css) {
    const preview = document.getElementById("preview-section");

    preview.style.display = "block";
    preview.innerHTML = html;
    const previousStyle = document.getElementById("dynamic-style");
    if (previousStyle) previousStyle.remove();

    if (css) {

      const styleElement = document.createElement("style");
      styleElement.id = "dynamic-style";
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }
}
    const form = document.querySelector('.form-group');
    const textarea = document.getElementById('description');

    form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const description = textarea.value.trim();

        if(!description)
            return;
        setLoading(true);

        try{
            const response = await fetch("https://isabellazz.app.n8n.cloud/webhook/0afeed7a-5489-42fd-aad3-a9bcb3ff2aef", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ description })
        
            });


    const data = await response.json();
    console.log(data);

      const htmlCode = document.getElementById("html-code");
      const cssCode = document.getElementById("css-code");

      htmlCode.textContent = data.html || "";
      cssCode.textContent = data.css || "";

      applyGeneratedPreview(data.html, data.css);
    } catch (error) {
      console.log("Erro ao gerar o fundo:", error);

      const htmlCode = document.getElementById("html-code");
      const cssCode = document.getElementById("css-code");
      const preview = document.getElementById("preview-section");

      htmlCode.textContent = "Não consegui gerar o HTML. Tente novamente.";
      cssCode.textContent = "Não consegui gerar o CSS. Tente novamente.";
      preview.innerHTML = "";

    } finally {
        setLoading(false);
    }
  });
});
