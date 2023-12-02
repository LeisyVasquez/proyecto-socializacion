import _ from '@lodash';

function HostModel(data) {
  data = data || {};

  return _.defaults(data, {
    url: '',
  });
}

export default HostModel;
