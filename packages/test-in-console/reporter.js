// A hacky way to extract the phantom runner script from the package.
if (process.env.WRITE_RUNNER_JS) {
  Npm.require('fs').writeFileSync(
    process.env.WRITE_RUNNER_JS, new Buffer(Assets.getBinary('runner.js')));
}

var url =  null;
if (Meteor.settings &&
    Meteor.settings.public &&
    Meteor.settings.public.runId &&
    Meteor.settings.public.reportTo) {
  url = Meteor.settings.public.reportTo +
      "/report/" +
      Meteor.settings.public.runId;
}

Meteor.methods({
  report: function (reports) {
    // XXX Could do a more precise validation here; reports are complex!
    check(reports, [Object]);
    if (url) {
      HTTP.post(url, {
        data: reports
      });
    }
    return null;
  }
});
