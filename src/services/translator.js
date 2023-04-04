import axios from "axios";

export const getTranslation = async (text) => {
  try {
    const { data } = await axios.get(
      `https://api.mymemory.translated.net/keygen?user=${
        import.meta.env.VITE_MYMEMORY_USER
      }&pass=${import.meta.env.VITE_MYMEMORY_PASS}`
    );
    const response = await axios.get("https://api.mymemory.translated.net", {
      params: {
        q: text,
        langpair: `en|pt`,
        key: data.key,
      },
    });

    const translation = response.data.responseData.translatedText;

    let fixTranslations;

    if (translation == "Limpar") {
      fixTranslations = "Limpo";
    } else if (translation == "Sunny") {
      fixTranslations = "Ensolarado";
    } else if (translation == "Encoberto") {
      fixTranslations = "Parcialmente nublado";
    } else {
      fixTranslations = translation;
    }
    return fixTranslations;
  } catch (error) {
    console.error(error);
    return null;
  }
};
