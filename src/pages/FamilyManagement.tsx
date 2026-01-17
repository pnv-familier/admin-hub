import React, { useState } from "react";
import {
  Button,
  Input,
  Badge,
  Card,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/common";
import { Search, Filter, Plus, Eye, Pencil, Trash2, Users, Calendar, MoreHorizontal } from "lucide-react";

interface Family {
  id: string;
  name: string;
  members: number;
  createdAt: string;
  status: "active" | "inactive" | "pending";
  owner: string;
}

const FamilyManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const families: Family[] = [
    { id: "1", name: "Johnson Family", members: 5, createdAt: "2024-01-15", status: "active", owner: "Sarah Johnson" },
    { id: "2", name: "Chen Family", members: 4, createdAt: "2024-01-18", status: "active", owner: "Mike Chen" },
    { id: "3", name: "Davis Family", members: 3, createdAt: "2024-01-20", status: "pending", owner: "Emily Davis" },
    { id: "4", name: "Smith Family", members: 6, createdAt: "2024-01-22", status: "active", owner: "John Smith" },
    { id: "5", name: "Wang Family", members: 4, createdAt: "2024-01-25", status: "inactive", owner: "Lisa Wang" },
    { id: "6", name: "Brown Family", members: 7, createdAt: "2024-02-01", status: "active", owner: "Robert Brown" },
    { id: "7", name: "Garcia Family", members: 5, createdAt: "2024-02-05", status: "active", owner: "Maria Garcia" },
    { id: "8", name: "Miller Family", members: 3, createdAt: "2024-02-10", status: "pending", owner: "David Miller" },
    { id: "9", name: "Wilson Family", members: 4, createdAt: "2024-02-12", status: "active", owner: "Jennifer Wilson" },
    { id: "10", name: "Taylor Family", members: 5, createdAt: "2024-02-15", status: "active", owner: "Chris Taylor" },
  ];

  const filteredFamilies = families.filter((family) => {
    const matchesSearch = family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      family.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || family.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredFamilies.length / itemsPerPage);
  const paginatedFamilies = filteredFamilies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: Family["status"]) => {
    const variants = {
      active: "success",
      inactive: "error",
      pending: "warning",
    } as const;
    return <Badge variant={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const handleView = (family: Family) => {
    setSelectedFamily(family);
    setViewModalOpen(true);
  };

  const handleDelete = (family: Family) => {
    setSelectedFamily(family);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic
    setDeleteModalOpen(false);
    setSelectedFamily(null);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Family Management</h1>
          <p className="text-muted-foreground mt-1">Manage all family groups in the system</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add Family
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search families or owners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <div className="animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Family Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFamilies.map((family) => (
              <TableRow key={family.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{family.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{family.owner}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{family.members}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(family.createdAt).toLocaleDateString()}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(family.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => handleView(family)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(family)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredFamilies.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* View Modal */}
      <Modal open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Family Details</ModalTitle>
            <ModalDescription>View detailed information about this family group</ModalDescription>
          </ModalHeader>
          {selectedFamily && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Family Name</label>
                  <p className="font-medium">{selectedFamily.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Owner</label>
                  <p className="font-medium">{selectedFamily.owner}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Members</label>
                  <p className="font-medium">{selectedFamily.members}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedFamily.status)}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Created Date</label>
                  <p className="font-medium">{new Date(selectedFamily.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
          <ModalFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Close
            </Button>
            <Button>Edit Family</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Delete Family</ModalTitle>
            <ModalDescription>
              Are you sure you want to delete "{selectedFamily?.name}"? This action cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FamilyManagement;
