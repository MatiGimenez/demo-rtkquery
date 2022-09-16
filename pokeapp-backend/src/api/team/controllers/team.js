"use strict";

/**
 * team controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::team.team", ({ strapi }) => ({
  async togglePokemon(ctx) {
    const { data: { pokemonId } = {} } = ctx.request.body;

    try {
      const currentTeam = await strapi.entityService.findMany(
        "api::team.team",
        {
          populate: "pokemons",
        }
      );

      const pokemonsId = currentTeam.pokemons.map((poke) => poke.id);
      const hasPokemon = pokemonsId.includes(pokemonId);

      let pokesUpdated = [];
      if (!hasPokemon) {
        pokesUpdated = pokemonsId.concat(pokemonId);
      } else {
        pokesUpdated = pokemonsId.filter((pokeId) => pokeId !== pokemonId);
      }

      const entity = await strapi.entityService.update(
        "api::team.team",
        currentTeam.id,
        {
          populate: "pokemons",
          data: {
            pokemons: pokesUpdated,
          },
        }
      );

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      const { data } = this.transformResponse(sanitizedEntity);

      return {
        data,
        isValid: true,
        messages: [],
      };
    } catch (err) {
      return err;
    }
  },
}));
