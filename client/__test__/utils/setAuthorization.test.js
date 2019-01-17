import setAuthorization from '../../utils/setAuthorization';

describe('#Set Authorization Token', () => {
  it('should set axios header when token is passed', () => {
    expect(setAuthorization('sampleToken')).toBe(true);
  });

  it('should delete axios header when token is not passed', () => {
    setAuthorization(undefined);
    expect(setAuthorization(undefined)).toBe(false);
  });
});
