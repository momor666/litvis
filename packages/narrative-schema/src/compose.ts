// @ts-ignore
import { NarrativeSchemaData } from "narrative-schema-common";
// @ts-ignore
import { VFileBase } from "vfile";

import {
  ComposedNarrativeSchema,
  EntityDefinitionWithOrigin,
  NarrativeSchema,
} from "narrative-schema-common";
import { composeEntityDefinitions } from "narrative-schema-common";
import { resolveAliasesAndKeyByName } from "narrative-schema-label";

const compose = async (
  narrativeSchemas: NarrativeSchema[],
): Promise<ComposedNarrativeSchema> => {
  let labels: EntityDefinitionWithOrigin[] = [];
  let rules: EntityDefinitionWithOrigin[] = [];
  let styling: EntityDefinitionWithOrigin[] = [];

  for (const narrativeSchema of narrativeSchemas) {
    labels = composeEntityDefinitions(narrativeSchema, "labels", labels);
    rules = composeEntityDefinitions(narrativeSchema, "rules", rules);
    styling = composeEntityDefinitions(narrativeSchema, "styling", styling);
  }
  return {
    components: narrativeSchemas,
    labels,
    rules,
    styling,
    labelByName: resolveAliasesAndKeyByName(labels),
  };
};

export default compose;
