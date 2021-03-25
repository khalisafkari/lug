interface config {
  playstore: boolean;
  location: string[];
  getKeyDev(): string;
  githubURL: string;
}
const config: config = {
  playstore: true,
  location: ['indonesia', 'japan'],
  getKeyDev: function () {
    return this.playstore
      ? 'EonR-a2oTpNULbJjwHLnGG5ewiukMwtwdSjGI'
      : '2vxLiLWmtKcNmCFOhZdEIsHHXIwGFN36DaiOU';
  },
  githubURL: 'https://api.github.com/repos/khalisafkari/lug/releases/latest',
};
export const getBannerId: string = config.playstore
  ? 'banner_playstore_only'
  : 'banner_ad';
export const getRewardId: string = config.playstore
  ? 'reward_playstore_only'
  : 'reward_ad';
export default config;
