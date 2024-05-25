variable "provider_region" {
  type        = string
  description = "value of the aws region"
}

variable "instance_type" {
  type        = string
  description = "value of the aws instance type"
  default     = "t2.micro"
}

variable "db_host" {
  type        = string
  description = "value of the db host"
}

variable "db_user" {
  type        = string
  description = "value of the db user"
}

variable "db_password" {
  type        = string
  description = "value of the db password"
}

variable "db_name" {
  type        = string
  description = "value of the db name"
}

variable "db_port" {
  type        = number
  description = "value of the db port"
}
