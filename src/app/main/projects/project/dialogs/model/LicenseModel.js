import _ from '@lodash';

function LicenseModel(data) {
  data = data || {};

  return _.defaults(data, {
    content: '',
  });
}

export default LicenseModel;
