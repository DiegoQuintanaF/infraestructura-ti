resource "aws_subnet" "admin_public_subnet_c" {
  vpc_id                  = aws_vpc.emovie_vpc.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = "${var.provider_region}c"
  map_public_ip_on_launch = true
}

resource "aws_route_table_association" "admin_public_assoc_c" {
  subnet_id      = aws_subnet.admin_public_subnet_c.id
  route_table_id = aws_route_table.emovie_public_rt.id
}

resource "aws_security_group" "admin_sg" {
  name        = "admin_sg"
  description = "Allow inbound traffic - frontend"
  vpc_id      = aws_vpc.emovie_vpc.id
}

resource "aws_vpc_security_group_ingress_rule" "admin_allow_ssh" {
  security_group_id = aws_security_group.admin_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "admin_allow_http" {
  security_group_id = aws_security_group.admin_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_egress_rule" "admin_allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.admin_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 0
  ip_protocol       = "-1"
  to_port           = 0
}

resource "aws_instance" "admin_vm_backend" {
  instance_type          = var.instance_type
  ami                    = data.aws_ami.vm_ami.id
  key_name               = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.admin_sg.id]
  subnet_id              = aws_subnet.admin_public_subnet_c.id
  # user_data              = file("userdata.tpl")

  root_block_device {
    volume_size = 10
  }
}

resource "aws_instance" "admin_vm_frontend" {
  instance_type          = var.instance_type
  ami                    = data.aws_ami.vm_ami.id
  key_name               = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.admin_sg.id]
  subnet_id              = aws_subnet.admin_public_subnet_c.id

  root_block_device {
    volume_size = 10
  }

  depends_on = [aws_instance.customer_vm_backend_1]
}
