import { Router } from "express"
import inviteRouter from "./users/invite"

export default (router: Router) => {
  inviteRouter(router)
  return router
} 