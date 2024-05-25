terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "~>4.0"
    }
  }

  cloud {
    organization = "dquintana"

    workspaces {
      name = "emovie_customer"
    }
  }
}

provider "aws" {
  region = var.provider_region
}
