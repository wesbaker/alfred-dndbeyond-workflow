const alfy = require("alfy");

alfy
  .fetch("https://www.dndbeyond.com/es/term", {
    query: { query: alfy.input }
  })
  .then(suggestions => {
    // No results
    if (suggestions["list"].length === 0) {
      return alfy.output([
        {
          title: `No suggestions found for '${alfy.input}'`,
          arg: "https://www.dndbeyond.com/search"
        }
      ]);
    }

    const searches = suggestions["list"].map(suggestion => {
      const cleaned = suggestion.replace(/'/g, "%27");
      return {
        title: suggestion,
        arg: `https://www.dndbeyond.com/search?q=${cleaned}`
      };
    });
    alfy.output(searches);
  });
