import { aggregateGroups } from 'https://deno.land/std@0.170.0/collections/aggregate_groups.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

const persons = {
  战士: ['至尊宝', '牛魔王'],
  法师: ['紫霞', '青霞'],
};
const descriptions = aggregateGroups(persons, (current, key, first, acc) => {
  if (first) {
    return `${key}是${current}`;
  }

  return `${acc}和${current}`;
});

assertEquals(descriptions, {
  战士: '战士是至尊宝和牛魔王',
  法师: '法师是紫霞和青霞',
});

import { associateBy } from 'https://deno.land/std@0.170.0/collections/associate_by.ts';

const users = [
  { name: '至尊宝', career: '战士' },
  { name: '紫霞', career: '法师' },
  { name: '青霞', career: '法师' },
];
const usersById = associateBy(users, (it) => it.name);

assertEquals(usersById, {
    至尊宝: { name: '至尊宝', career: '战士' },
    紫霞: { name: '紫霞', career: '法师' },
    青霞: { name: '青霞', career: '法师' },
  });
