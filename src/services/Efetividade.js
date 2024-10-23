// Objeto contendo as vantagens e desvantagens de cada tipo de Pokémon
const typeAdvantages = {
    Normal: { strong: [], weak: ['Fighting'], immune: ['Ghost'] },
    Fire: { strong: ['Bug', 'Grass', 'Ice', 'Steel'], weak: ['Ground', 'Rock', 'Water'], immune: [] },
    Water: { strong: ['Fire', 'Ground', 'Rock'], weak: ['Electric', 'Grass'], immune: [] },
    Electric: { strong: ['Flying', 'Water'], weak: ['Ground'], immune: [] },
    Grass: { strong: ['Ground', 'Rock', 'Water'], weak: ['Bug', 'Fire', 'Flying', 'Ice', 'Poison'], immune: [] },
    Ice: { strong: ['Dragon', 'Flying', 'Grass', 'Ground'], weak: ['Fighting', 'Fire', 'Rock', 'Steel'], immune: [] },
    Fighting: { strong: ['Dark', 'Ice', 'Normal', 'Rock', 'Steel'], weak: ['Fairy', 'Flying', 'Psychic'], immune: [] },
    Poison: { strong: ['Fairy', 'Grass'], weak: ['Ground', 'Psychic'], immune: [] },
    Ground: { strong: ['Electric', 'Fire', 'Poison', 'Rock', 'Steel'], weak: ['Ice', 'Grass', 'Water'], immune: ['Electric'] },
    Flying: { strong: ['Bug', 'Fighting', 'Grass'], weak: ['Electric', 'Ice', 'Rock'], immune: ['Ground'] },
    Psychic: { strong: ['Fighting', 'Poison'], weak: ['Bug', 'Dark', 'Ghost'], immune: [] },
    Bug: { strong: ['Dark', 'Grass', 'Psychic'], weak: ['Fire', 'Flying', 'Rock'], immune: [] },
    Rock: { strong: ['Bug', 'Fire', 'Flying', 'Ice'], weak: ['Fighting', 'Grass', 'Ground', 'Steel', 'Water'], immune: [] },
    Ghost: { strong: ['Ghost', 'Psychic'], weak: ['Dark', 'Ghost'], immune: ['Normal', 'Fighting'] },
    Dragon: { strong: ['Dragon'], weak: ['Dragon', 'Fairy', 'Ice'], immune: [] },
    Dark: { strong: ['Ghost', 'Psychic'], weak: ['Bug', 'Fairy', 'Fighting'], immune: ['Psychic'] },
    Steel: { strong: ['Fairy', 'Ice', 'Rock'], weak: ['Fighting', 'Fire', 'Ground'], immune: ['Poison'] },
    Fairy: { strong: ['Dark', 'Dragon', 'Fighting'], weak: ['Poison', 'Steel'], immune: ['Dragon'] },
  };

  // Função para determinar a efetividade de um conjunto de tipos de Pokémon
  export const getEffectiveness = (types) => {
    
    // Objeto que armazena as vantagens, desvantagens e imunidades resultantes
    const effectiveness = { strong: [], weak: [], immune: [] };
  
    // Itera sobre cada tipo fornecido
    types.forEach(type => {
      const advantages = typeAdvantages[type];// Obtém as vantagens e desvantagens do tipo atual
      advantages.strong.forEach(t => {
        if (!effectiveness.strong.includes(t)) effectiveness.strong.push(t);// Adiciona as vantagens do tipo atual ao objeto de efetividade
      });
      advantages.weak.forEach(t => {
        if (!effectiveness.weak.includes(t)) effectiveness.weak.push(t);// Adiciona as desvantagens do tipo atual ao objeto de efetividade
      });
      advantages.immune.forEach(t => {
        if (!effectiveness.immune.includes(t)) effectiveness.immune.push(t);// Adiciona as imunidades do tipo atual ao objeto de efetividade
      });
    });
  
    return effectiveness;// Retorna o objeto de efetividade resultante
  };
  