import * as types from './actionTypes';
import * as authActions from '../auth/actions';
import * as errorActions from '../error/actions';
import jobService from '../../services/job';

export function submitJob(job) {
  return authActions.wrappedRequest(
    auth => jobService.submitJob(job, auth.token),
    null,
    error => errorActions.setForeground("Could not submit job: " + error.message),
    () => fetchJobs()
  );
}

export function fetchJobs() {
  return authActions.wrappedRequest(
    auth => jobService.fetchJobs(auth.token),
    jobs => ({ type: types.SET_JOBS, jobs }),
    error => errorActions.addBackground("Could not fetch jobs: " + error.message, "jobs"),
    () => errorActions.clearBackground("jobs")
  );
}

export function deleteJob(job) {
  return authActions.wrappedRequest(
    auth => jobService.deleteJob(job, auth.token),
    null,
    error => errorActions.setForeground("Failed to delete job: " + error.message),
    () => fetchJobs()
  );
}