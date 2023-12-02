import _ from '@lodash';

function LicenseModel(data) {
  data = data || {};

  return _.defaults(data, {
    number: 0,
  });
}

export default LicenseModel;
