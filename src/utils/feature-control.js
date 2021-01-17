/* global window */

import { pickBy, omit, includes, has } from 'lodash';

export function makeFeatureControl({ lsKey, features }) {
  let activeFeatures = {};

  function updateActiveFeatures() {
    let data = {};
    try {
      data = JSON.parse(window.localStorage.getItem(lsKey)) || {};
    } catch (err) {
      console.error(err);
    }

    activeFeatures = pickBy(data, (featureState, featureName) => {
      return featureState === true && includes(features, featureName);
    });
  }

  function checkIsFeatureActive(featureName) {
    return has(activeFeatures, featureName);
  }

  function toggleFeatureState(featureName, featureState = false) {
    if (featureState === true) {
      activeFeatures = {
        [featureName]: true,
        ...activeFeatures,
      };
    } else {
      activeFeatures = omit(activeFeatures, [featureName]);
    }

    try {
      window.localStorage.setItem(lsKey, JSON.stringify(activeFeatures));
    } catch (err) {
      console.error(err);
    }
  }

  return {
    updateActiveFeatures,
    checkIsFeatureActive,
    toggleFeatureState,
  };
}
