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
      const isPokemonExist = pokemonsId.includes(pokemonId);

      let pokesUpdated = [];
      if (isPokemonExist) {
        pokesUpdated = pokemonsId.filter((pokeId) => pokeId !== pokemonId);
      } else {
        if (currentTeam.pokemons.length >= 6) {
          return ctx.preconditionFailed(
            "No puedes tener más de 6 pokemones en tu equipo"
          );
        }

        pokesUpdated = pokemonsId.concat(pokemonId);
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
      const { data, meta } = this.transformResponse(sanitizedEntity);

      return {
        data,
        meta,
      };
    } catch (err) {
      return err;
    }
  },
}));
